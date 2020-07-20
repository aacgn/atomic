import { CustomWindowVariable } from "../../@core/enums/custom-window-variable.enum";

export function mapContextStore(name = null) {	
    if (name) {
        return window[CustomWindowVariable.ATOMIC_CONTEXT_STORE][name];
    }
    
    return window[CustomWindowVariable.ATOMIC_CONTEXT_STORE];	
} 	
