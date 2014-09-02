import QtQuick 2.0
import QtTest 1.0

import "../.." as App
import "../../functions.js" as Functions

Item {
  id: root
  width: 200
  height: 200

  TestCase {
      name: "ComparaAnnunciUnitTest"
      when: windowShown

      //wordListClassifieds
      function test_wordListClassifieds_data()
      {
          return [
                      {tag: "This is a test", str: "This is a test", ans:["This", "is", "a", "test"] },
                      {tag: "Punctuation", str: "This is a test.", ans:["This", "is", "a", "test."] },
                  ];
      }

      function test_wordListClassifieds(data) {
          compare(Functions.wordListClassified(data.str), data.ans, "The classified is splitted uncorrectly");
      }

      //splitSymbol
      function test_splitSymbol_data()
      {
          return [
                    {tag: "test 1", cls: "This is a test.", sym: ".", ans: "This is a test ."}
                  ];
      }

      function test_splitSymbol(data)
      {
          compare("|" + Functions.splitSymbols(data.cls, data.sym) + "|", "|" + data.ans + "|");
      }

  }
}
