import QtQuick 2.2
import QtQuick.Window 2.1
import QtQuick.Controls 1.1
import "functions.js" as Functions


Window {
    id: mainWindow
    visible: true
    width: 400
    height: 600
    color: "#F2F1F0"

    Column {
        //Anchors
        anchors.fill: parent
        anchors.margins: 10
        spacing: 5

        Label {
            text: qsTr("Paste here the text for the old file.")
        }

        //Used to paste the text
        TextArea{
            id: oldArea
            //Size and Position
            width: parent.width

            //Make use Plain Text
            textFormat: TextEdit.PlainText
        }

        Label {
            text: qsTr("Paste here the text for the new file.")
        }

        TextArea{
            id: newArea
            //Size and Position
            width: parent.width

            //Make use Plain Text
            textFormat: TextEdit.PlainText
        }

        Label {
            text: qsTr("Classifieds that needs to be removed.")
        }

        TextArea{
            id: junkArea
            //Size and Position
            width: parent.width

            //Make use Plain Text
            textFormat: TextEdit.PlainText
        }

        Button{
            text: qsTr("Start process!")
            anchors.right: parent.right
            onClicked:
            {
                if (oldArea.text && newArea.text)
                    junkArea.text = Functions.compareClassifieds(oldArea.text, newArea.text);
                else
                     Qt.createComponent("dialog.qml").createObject(mainWindow, {});
            }

        }
    }
}
