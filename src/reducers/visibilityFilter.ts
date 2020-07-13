import { ISetVisibilityFilterAction } from '../actions';
import { SET_VISIBILITY_FILTER } from '../constants';
import { VisibilityFilters } from '../types';

const VisibilityFilter = (state = VisibilityFilters.SHOW_ALL, action: ISetVisibilityFilterAction): VisibilityFilters => {
    switch(action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export default VisibilityFilter;