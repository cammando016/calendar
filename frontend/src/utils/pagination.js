export const incrementPage = (stateValue, stateSetter, pageCount) => {
    if(stateValue < pageCount - 1) {
        stateSetter(stateValue + 1);
    }
}

export const decrementPage = (stateValue, stateSetter) => {
    if (stateValue > 0) {
        stateSetter(stateValue - 1);
    }
}

export const firstPage = (stateSetter) => {
    stateSetter(0);
}

export const lastPage = (stateSetter, pageCount) => {
    stateSetter(pageCount - 1);
}