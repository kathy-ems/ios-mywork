import React from "react";
import { Dimensions, StyleSheet, SafeAreaView, ScrollView, useWindowDimensions } from "react-native";
import RenderHtml from 'react-native-render-html';

export default function DescriptionComponent({ task }: any,
) {
  const { width, height } = useWindowDimensions();
  const description = {
    html: task.description
  }

  const tagsStyles = {
    body: {
      fontSize: height < 750 ? 14 : 16
    },
  };

  return (
    <SafeAreaView style={styles.descriptionContainer}>
      <ScrollView style={styles.scrollView}>
        <RenderHtml
          contentWidth={width}
          source={description}
          tagsStyles={tagsStyles}
          />
      </ScrollView>
    </SafeAreaView>
 )
}

var screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  descriptionContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    paddingHorizontal: screenWidth * .03,
    marginTop: 15,
  },
  scrollView: {
    paddingBottom: 10,
  },
});
