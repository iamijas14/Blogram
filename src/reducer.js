export const initialState = {
    blog: [],
};


const reducer = (state, action) => {
    switch (action.type) {

        case 'ADD_TO_BLOG':
            return {
                ...state,
                blog: [...state.blog, action.item]
            }

        default:
            return state;
    }
}

export default reducer