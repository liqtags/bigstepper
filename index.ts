import { 
    step1, 
    step2
 } from "./steps";

type Step = (context?: any) => Promise<any>; // Module type definition

interface StepDefinition {
    step: Step; // Module to run
    dependencies?: string[]; // List of dependencies
}

/**
 * StepSystem class
 * @liqtags
 * @description A class to run a series of modules in order
 */
class StepSystem {
    steps: StepDefinition[]; // List of modules to run

    constructor(steps: StepDefinition[]) {
        this.steps = steps; // Initialize modules
    }

    async run() {
        let context: any = {}; // Initialize context

        for (const moduleDef of this.steps) { // Loop through each module
            if (moduleDef.dependencies) { // Check if module has dependencies
                for (const dependency of moduleDef.dependencies) { // Loop through each dependency
                    if (!context[dependency]) { // Check if dependency is not met
                        throw new Error(`Dependency '${dependency}' not met.`); // Throw error
                    } // Dependency met
                }
            } 
            
            context = { ...context, ...(await moduleDef.step(context)) }; // Run module and update context
        }

        return context;
    }
}

// Create a step system
const stepSystem = new StepSystem([
    { step: step1 },
    { step: step2, dependencies: ['data1'] } // Module 2 depends on data1 from module1
]);

// Run the step system
stepSystem.run().then((context) => {
    console.log("All modules completed.");
    console.log("Context:", context);
}).catch(error => {
    console.error("Error:", error.message);
});
