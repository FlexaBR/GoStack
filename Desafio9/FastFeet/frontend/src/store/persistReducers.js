import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: ['auth', 'user'], // colocar os reducers que quero persisitir em caso de F5 (exemplo)
    },
    reducers
  );

  return persistedReducer;
};
