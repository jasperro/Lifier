import React from "react";
import { updateXP, getXP } from "../storage/Experience";
import { TextInput, Text } from "./Themed";
import { TouchableOpacity, View } from "react-native";
import { createStore } from "redux";
import { connect } from "react-redux";

// Maak een reducer voor redux, hier verander je de staat mee
const reducerXP = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

// Maak een redux store voor de XP
const store = createStore(reducerXP);

// Input en knop om XP te veranderen
export class XPSetter extends React.Component {
  state = {
    xp: 0,
  };
  handleInput = (text: string) => {
    this.setState({ xp: parseInt(text) });
  };
  render() {
    return (
      <View>
        <TextInput
          onChangeText={this.handleInput}
          onSubmitEditing={() => store.dispatch({ type: "DECREMENT" })}
        ></TextInput>
        <TouchableOpacity onPress={() => store.dispatch({ type: "INCREMENT" })}>
          <Text> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class XPBar extends React.Component {
  constructor(props) {
    super(props);
    store.subscribe(this.render);
  }
  render() {
    return (
      <View>
        <Text>Your xp is {store.getState()}</Text>
      </View>
    );
  }
}

connect(reducerXP)(XPBar);
