type Step = (context?: any) => Promise<any>; // Module type definition

const basicStepCheck = (context: any) => {
    if (!context){
        throw new Error("Context is not defined.") 
    }

    if (!context.abc) {
        throw new Error("ABC is not defined.");
    }
}

export const step1: Step = async (context?: any) => {
    console.log("Running Step 1");
    return { data1: 'some data from step 1', ...context };
};

export const step2: Step = async (context?: any) => {
    await basicStepCheck(context);

    if (!context || !context.data1) {
        throw new Error("Step 2 depends on data1 from step 1 which is not loaded.");
    }
    return { newData: 'some new data from module 2', ...context };
};