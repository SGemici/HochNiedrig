import { ImageSourcePropType } from "react-native";


export type cardProperties = {
  image : ImageSourcePropType; 
  rang : number;
};


export const cards = [
  { "image" : require("../assets/cards/2_of_diamonds.png"), "rang": 2},
  { "image" : require("../assets/cards/2_of_clubs.png"), "rang": 2},
  { "image" : require("../assets/cards/2_of_hearts.png"), "rang": 2},
  { "image" : require("../assets/cards/2_of_spades.png"), "rang": 2},
  { "image" : require("../assets/cards/3_of_clubs.png"), "rang": 3},
  { "image" : require("../assets/cards/3_of_diamonds.png"), "rang": 3},
  { "image" : require("../assets/cards/3_of_hearts.png"), "rang": 3},
  { "image" : require("../assets/cards/3_of_spades.png"), "rang": 3},
  { "image" : require("../assets/cards/4_of_clubs.png"), "rang": 4},
  { "image" : require("../assets/cards/4_of_diamonds.png"), "rang": 4},
  { "image" : require("../assets/cards/4_of_hearts.png"), "rang": 4},
  { "image" : require("../assets/cards/4_of_spades.png"), "rang": 4},
  { "image" : require("../assets/cards/5_of_clubs.png"), "rang": 5},
  { "image" : require("../assets/cards/5_of_diamonds.png"), "rang": 5},
  { "image" : require("../assets/cards/5_of_hearts.png"), "rang": 5},
  { "image" : require("../assets/cards/5_of_spades.png"), "rang": 5},
  { "image" : require("../assets/cards/6_of_clubs.png"), "rang": 6},
  { "image" : require("../assets/cards/6_of_diamonds.png"), "rang": 6},
  { "image" : require("../assets/cards/6_of_hearts.png"), "rang": 6},
  { "image" : require("../assets/cards/6_of_spades.png"), "rang": 6},
  { "image" : require("../assets/cards/7_of_clubs.png"), "rang": 7},
  { "image" : require("../assets/cards/7_of_diamonds.png"), "rang": 7},
  { "image" : require("../assets/cards/7_of_hearts.png"), "rang": 7},
  { "image" : require("../assets/cards/7_of_spades.png"), "rang": 7},
  { "image" : require("../assets/cards/8_of_clubs.png"), "rang": 8},
  { "image" : require("../assets/cards/8_of_diamonds.png"), "rang": 8},
  { "image" : require("../assets/cards/8_of_hearts.png"), "rang": 8},
  { "image" : require("../assets/cards/8_of_spades.png"), "rang": 8},
  { "image" : require("../assets/cards/9_of_clubs.png"), "rang": 9},
  { "image" : require("../assets/cards/9_of_diamonds.png"), "rang": 9},
  { "image" : require("../assets/cards/9_of_hearts.png"), "rang": 9},
  { "image" : require("../assets/cards/9_of_spades.png"), "rang": 9},
  { "image" : require("../assets/cards/10_of_clubs.png"), "rang": 10},
  { "image" : require("../assets/cards/10_of_diamonds.png"), "rang": 10},
  { "image" : require("../assets/cards/10_of_hearts.png"), "rang": 10},
  { "image" : require("../assets/cards/10_of_spades.png"), "rang": 10},
  { "image" : require("../assets/cards/jack_of_clubs.png"), "rang": 11},
  { "image" : require("../assets/cards/jack_of_diamonds.png"), "rang": 11},
  { "image" : require("../assets/cards/jack_of_hearts.png"), "rang": 11},
  { "image" : require("../assets/cards/jack_of_spades.png"), "rang": 11},
  { "image" : require("../assets/cards/queen_of_clubs.png"), "rang": 12},
  { "image" : require("../assets/cards/queen_of_diamonds.png"), "rang": 12},
  { "image" : require("../assets/cards/queen_of_hearts.png"), "rang": 12},
  { "image" : require("../assets/cards/queen_of_spades.png"), "rang": 12},
  { "image" : require("../assets/cards/king_of_clubs.png"), "rang": 13},
  { "image" : require("../assets/cards/king_of_diamonds.png"), "rang": 13},
  { "image" : require("../assets/cards/king_of_hearts.png"), "rang": 13},
  { "image" : require("../assets/cards/king_of_spades.png"), "rang": 13},  
  { "image" : require("../assets/cards/ace_of_clubs.png"), "rang": 14},
  { "image" : require("../assets/cards/ace_of_diamonds.png"), "rang": 14},
  { "image" : require("../assets/cards/ace_of_hearts.png"), "rang": 14},
  { "image" : require("../assets/cards/ace_of_spades.png"), "rang": 14},
] as cardProperties[]; //as ImageSourcePropType[];