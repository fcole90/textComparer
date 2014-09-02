//Returns the classified as a list of words
function wordListClassified(classified) {
    return classified.split(" ");
}

//Splits the symbols from the words with a space
function splitSymbols(classified, symbol)
{
    var list = classified.split(symbol);
    var editedClassified = list[0];
    var len = list.length;
    for (var i=1; i<len; i++)
    {
        editedClassified += " " + symbol + " " + list[i];
    }

    //Remove double whitespaces and border whitespaces
    editedClassified = editedClassified.replace("  ", " ").trim();

    return editedClassified;
}


//Evaluates the similarity between two lists
function areSimilar(list1, list2, minimalSimilarity)
{
    //set default parameter
    minimalSimilarity = minimalSimilarity || 80;

    var lenList1 = list1.length;
    var lenList2 = list2.length;
    var similarityIndex = (lenList1 + lenList2)/2.0;
    var equalsFound = 0;
    var percSimilarity = 0.0;

    //copies the lists to not affect the original ones
    var copyList1 = list1.slice(0);
    var copyList2 = list2.slice(0);

    //iterates comparing the elements
    for (var i=0; i<lenList1; i++)
    {
        for (var j=0; i<lenList2; j++)
        {
            if ((j == lenList2 - 1) && (copyList1[i] != copyList2[j]) && (copyList2[j] != "EMPTY"))
            {
                equalsFound--;
                break;
            }
            else if (copyList1[i] == copyList2[j])
            {
                equalsFound++;
                copyList2[j] = "EMPTY";
                break;
            }

        }
    }

    //Convert the values to a percentual
    if (equalsFound)
        percSimilarity = equalsFound * 100 / similarityIndex;
    else
        percSimilarity = 0.0

    //Returns
    if (percSimilarity >= minimalSimilarity)
        return true;
    else
        return false;

}

//split the text in a list of classifieds
function splitClassifieds(classifiedsString)
{
    var classifiedList = [];
    var breakedList = classifiedsString.split("\n");
    var len = breakedList.length;

    for (var i = 0; i<len; i++)
    {
        if (breakedList[i] != "")
            classifiedList.push(breakedList[i]);
    }
    return classifiedList;
}

//create the classifieds list, ready to be used
function getClassifiedsList(classifiedsString)
{
    var list = splitClassifieds(classifiedsString);
    var classifiedList = [];
    var classified = "";
    var listOfLists = [];
    var listOfWords = []
    var symbolsToSplit = [",",".",":","(",")","!","?"];
    var lenList = list.length;
    var lenSymbols = symbolsToSplit.length;


    for (var i = 0; i < lenList; i++)
    {
        classifiedList = [];
        classified = list[i];

        for (var j = 0; j < lenSymbols; j++)
        {
            classified = splitSymbols(classified, symbolsToSplit[i]);
        }

        listOfWords = wordListClassified(classified);

        //avoid adding titles composed by few words
        if (listOfWords.length > 5)
            listOfLists.push(listOfWords);

    }

    return listOfLists;
}

//compare classifieds to get listOfOld or listOfJunk
function iterateComparison(rlistOfLists1, rlistOfLists2, mode)
{
    //set default parameter
    mode = mode || 0;

    //copy the lists
    var listOfLists1 = rlistOfLists1.slice(0);
    var listOfLists2 = rlistOfLists2.slice(0)
    var listOfOlds = [];
    var listOfJunkClassifieds = [];
    var lenList1 = listOfLists1.length;
    var lenList2 = listOfLists2.length;

    for (var i = 0; i < lenList2; i++)
    {
        for (var j = 0; j < lenList1; j++)
        {
            if (areSimilar(listOfLists2[i], listOfLists1[j]) && listOfLists2.length!=0 && listOfLists1.length!=0)
            {
                listOfOlds.push(j);
                listOfJunkClassifieds.push(listOfLists2[i]);
                listOfLists1 = [];
                break;
             }
        }

        switch(mode)
        {
        case 0:
            return listOfOlds;
        default:
            return listOfJunkClassifieds;
        }
    }


}

//rebuilds the classifieds from the list
function rebuild(rList)
{
    var list = rList.slice(0);
    var lenList = list.length;
    var lenClassified = 0;
    var fullText = "";
    var text = "";

    for (var i = 0; i < lenList; i++)
    {
        lenClassified = list[i].length;

        for (var j = 0; j < lenClassified; j++)
        {
            if (text != "" && [",",".",":","(",")","!","?"].indexOf(list[i])<0)
                list[i] = " " + list[i];
            text += list[i];
        }

        fullText += text + "\n\n";

    }

    return fullText;
}

//returns the list of junks giving parameters text
function compareClassifieds(text1, text2)
{
    //mode 1 means to return listOfJunkClassifieds
    var listOfJunk = iterateComparison(getClassifiedsList(text1), getClassifiedsList(text2), 1);
    if (listOfJunk !== undefined)
        return rebuild(listOfJunk);
    else
        return qsTr("Nessun annuncio trovato.");
}
