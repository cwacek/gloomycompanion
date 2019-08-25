import React from "react";
import { IMapTile, MapTileAsJSON } from "./playarea";
import { HexRef } from "./HexRef";
import autobind from "autobind-decorator";

import * as firebase from 'firebase/app';
import 'firebase/firestore'

interface IPlacedTile {tile : IMapTile, center : HexRef, rotation: number};


interface IScenarioState {
  placedMapTiles : IPlacedTile[];
  placeTile : (tile : IPlacedTile) => void;
}

export const ScenarioState = React.createContext<IScenarioState>({
    placedMapTiles: [],
    placeTile: (t) => {}
})

export class ScenarioStateProvider extends React.Component<{}, IScenarioState> {
    db!: firebase.firestore.Firestore;

    componentDidMount() {

        console.log(`DBURL: ${process.env.REACT_APP_FIREBASE_databaseURL}`)
        firebase.initializeApp({
            apiKey: process.env.REACT_APP_FIREBASE_apiKey,
            authDomain: process.env.REACT_APP_FIREBASE_authDomain,
            databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
            projectId: process.env.REACT_APP_FIREBASE_projectId,
            storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
            messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId
        })

        this.db = firebase.firestore();

        this.db.collection("placedTiles").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });
    }

    state = {
        placedMapTiles: [],
        placeTile: this.placeTile
    }

    @autobind
    placeTile(t : IPlacedTile) {
        this.setState(pState => {
            return {
                placedMapTiles: pState.placedMapTiles.concat([t])
            }
        }, () => {
            this.db.collection('placedTiles').add({
                center: t.center.toJSON(),
                rotation: t.rotation,
                tile: MapTileAsJSON(t.tile)
            })
            .then((docRef) => {
                debugger
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) =>{
                debugger
                console.error("Error adding document: ", error);
            });
        })
    }

    render () {
        return <ScenarioState.Provider value={this.state}>
        {this.props.children}
        </ScenarioState.Provider>
    }
}