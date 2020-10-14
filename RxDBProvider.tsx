import React, { useEffect, useState } from "react";
import { Provider } from "rxdb-hooks";
import initializeDB from "./model/database";

const RxDBProvider = (props) => {
    const [db, setDb] = useState();

    useEffect(() => {
        // Notice that RxDB instantiation is asynchronous; until db becomes available
        // consumer hooks that depend on it will still work, absorbing the delay by
        // setting their state to isFetching:true
        const initDB = async () => {
            const _db = await initializeDB();
            setDb(_db);
        };
        initDB();
    }, []);

    // Provide RxDB instance; hooks can now be used within the context of the Provider
    return (
        <Provider db={db}>
            {props.children}
        </Provider>
    );
};

export default RxDBProvider;