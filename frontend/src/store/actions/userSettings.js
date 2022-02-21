import axios from "axios";

export function updateInput(value, stateProp) {
    return {
        type: "UPDATE_INPUT",
        payload: {
            input: {
                value,
                stateProp
            }
        }
    };
}
