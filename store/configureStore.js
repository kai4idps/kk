import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const configureStore = () => {
	const persistConfig = {
		key: "authType",
		storage: storage
	};
	const pReducer = persistReducer(persistConfig, reducers);
	const store = createStore(
		pReducer,
		composeWithDevTools(applyMiddleware(thunk))
	);
	const persistor = persistStore(store);

	return {
		store: store,
		persistor
	};
};

export default configureStore;
