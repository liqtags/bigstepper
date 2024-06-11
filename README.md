# Step System

This repository contains a Typescript implementation of a Step System, designed to execute a series of modules in a specified order. The system allows for defining dependencies between modules to ensure proper execution flow.

## Usage

To use the Step System, follow these steps:

1. **Define Steps**: Create individual modules (steps) to be executed. Each module should be a function returning a Promise.

2. **Create Step Definitions**: Define each step along with its dependencies, if any, using the `StepDefinition` interface.

3. **Initialize Step System**: Instantiate a `StepSystem` object with an array of step definitions.

4. **Run the Step System**: Call the `run()` method of the `StepSystem` instance to execute the defined modules sequentially.

## Example

```javascript
import { step1, step2 } from "./steps";

// Define step definitions
const steps = [
    { step: step1 },
    { step: step2, dependencies: ['data1'] } // Module 2 depends on data1 from module1
];

// Initialize StepSystem
const stepSystem = new StepSystem(steps);

// Run the step system
stepSystem.run().then((context) => {
    console.log("All modules completed.");
    console.log("Context:", context);
}).catch(error => {
    console.error("Error:", error.message);
});
