import axios from "../../axios-orders";
import * as actions from "../actions";
import { put } from 'redux-saga/effects';

export function* initIngredientsSaga(action) {
let response;
  try {
      response = yield axios.get(
      "https://reactapp-f62dc.firebaseio.com/Ingredients.json"
    );
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed(response.data));
  }
}
