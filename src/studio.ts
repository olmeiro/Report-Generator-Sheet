function createFetchSheet():void {
    try {        
        const idStudio = Utils.getStudioFolder(); 
        const foreingSheets = Utils.getSheetsStudio(idStudio); 
        Logger.log("foreing sheets: " + foreingSheets);
        const ssStudio = SpreadsheetApp.getActiveSpreadsheet();
    
        foreingSheets.forEach(sheetF => {
            ssStudio.insertSheet().setName(sheetF); 
            const foreingSheet = SpreadsheetApp.openById(idStudio);
            const sheetForeing = foreingSheet.getSheetByName(sheetF);
            let row = sheetForeing.getLastRow();
            let column = sheetForeing.getLastColumn();
           
            for (let index = 1; index <= column; index++) {
                const SS = SpreadsheetApp.getActiveSheet();
                const ss = SpreadsheetApp.getActiveSpreadsheet(); 
                let sheetStudio = ss.getSheetByName(sheetF);
                //Style sheet:
                const arrayHeaders = [["Score", "Strength", "Weakness"]];
                const headers = 
                sheetStudio
                    .getRange('B1:D1')
                    .setValues(arrayHeaders)
                    .setFontFamily('Calibri')
                    .setFontSize(12);
                sheetStudio
                    .getRange('A1:D1')
                    .setFontColor('#ffffff')
                    .setBackground('#819410')
                    .setFontWeight('bold')
                    .setHorizontalAlignment('left');
                const headerRange = sheetStudio.getRange(1, sheetStudio.getLastColumn());
                const headerColumn = sheetStudio.getRange(1, 1, sheetStudio.getLastRow());
                // Apply each format to the top row:
                headerRange
                    .setFontWeight('bold')
                    .setFontColor('#ffffff')
                    .setBackground('#819410')
                    .setFontFamily('Calibri')
                    .setFontSize(12)
                    .setHorizontalAlignment('left')
                    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
                headerColumn
                    .setFontSize(12)
                    .setFontFamily('Calibri')
                    .setHorizontalAlignment('left');
                    sheetStudio
                    .autoResizeColumns(1, 1)
                    .setRowHeight(1, 30)
                    .setColumnWidth(1, 250)
                    .setColumnWidth(2, 50)
                    .setColumnWidth(3, 400)
                    .setColumnWidth(4, 400);
    
                let lastRow = SS.getLastRow();
                let rangeNewSheet = sheetForeing.getRange(1, index, sheetForeing.getLastRow()).getValues();
                let rangeNotesSheet = sheetForeing.getRange(1, index, sheetForeing.getLastRow()).getNotes();
    
                if (lastRow == 1) {
                    var rangeToCopy = SS.getRange(1, 1, sheetForeing.getLastRow());
                    
                    rangeToCopy.copyTo(sheetStudio.getRange(1, 1, 
                    sheetForeing.getLastRow()).setValues(rangeNewSheet).setNotes(rangeNotesSheet),SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
    
                     //Add range to score (1-5):
                     const lastRowSheet = sheetStudio.getLastRow();
                     sheetStudio.getRange(`B2:B${lastRowSheet}`).setDataValidation(SpreadsheetApp.newDataValidation()
                     .setAllowInvalid(false)
                     .requireValueInRange(sheetStudio.getRange('Reference!$A$2:$A$6'), true)
                     .build());
    
                     //wrap
                     sheetStudio.getRange(`C2:D${lastRowSheet}`).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    
                    // Adds a conditional format rule
                    var sheet = SpreadsheetApp.getActiveSheet();
                    var range = sheet.getRange(`B2:B${lastRowSheet}`);
                    var rule = SpreadsheetApp.newConditionalFormatRule()
                        .whenNumberGreaterThanOrEqualTo(4)
                        .setBackground("#B7E1CD")
                        .setRanges([range])
                        .build();
                    var rules = sheet.getConditionalFormatRules();
                    rules.push(rule);
                    sheet.setConditionalFormatRules(rules);
    
                    var sheet = SpreadsheetApp.getActiveSheet();
                    var range = sheet.getRange(`B2:B${lastRowSheet}`);
                    var rule = SpreadsheetApp.newConditionalFormatRule()
                        .whenNumberLessThan(4)
                        .setBackground("#f4c7c3")
                        .setRanges([range])
                        .build();
                    var rules = sheet.getConditionalFormatRules();
                    rules.push(rule);
                    sheet.setConditionalFormatRules(rules);
                     
                }else{
    
                    const arraySubTitles = [["","Score","Strength", "Weakness"]];
                    const subTitles = sheetStudio.getRange(lastRow+1,1,1,4);
                    subTitles
                    .setValues(arraySubTitles)
                    .setFontFamily('Calibri')
                    .setFontSize(12)
                    .setHorizontalAlignment('center');
    
                    var rangeToCopy = SS.getRange(lastRow+1, 1, sheetForeing.getLastRow());
                    const subHeader = sheetStudio.getRange(lastRow+1,1,1,4);
                    subHeader
                    .setFontSize(12)
                    .setFontWeight('bold')
                    .setFontColor('#ffffff')
                    .setBackground('#b7e1cd')
                    .setFontFamily('Calibri')
                    .setHorizontalAlignment('left');                
                    
                    rangeToCopy.copyTo(sheetStudio.getRange(lastRow+1, 1, 
                    sheetForeing.getLastRow()).setValues(rangeNewSheet).setNotes(rangeNotesSheet),SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
    
                    //Add range to score (1-5):
                    const lastRowSheet = sheetStudio.getLastRow();
                    sheetStudio.getRange(`B${lastRow+2}:B${lastRowSheet}`).setDataValidation(SpreadsheetApp.newDataValidation()
                    .setAllowInvalid(false)
                    .requireValueInRange(sheetStudio.getRange('Reference!$A$2:$A$6'), true)
                    .build());
    
                    //wrap
                    sheetStudio.getRange(`C${lastRow+2}:D${lastRowSheet}`).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    
                     // Adds a conditional format rule 
                    var sheet = SpreadsheetApp.getActiveSheet();
                    var range = sheet.getRange(`B2:B${lastRowSheet}`);
                    var rule = SpreadsheetApp.newConditionalFormatRule()
                        .whenNumberGreaterThanOrEqualTo(4)
                        .setBackground("#B7E1CD")
                        .setRanges([range])
                        .build();
                    var rules = sheet.getConditionalFormatRules();
                    rules.push(rule);
                    sheet.setConditionalFormatRules(rules);
    
                    var sheet = SpreadsheetApp.getActiveSheet();
                    var range = sheet.getRange(`B2:B${lastRowSheet}`);
                    var rule = SpreadsheetApp.newConditionalFormatRule()
                        .whenNumberLessThan(4)
                        .setBackground("#f4c7c3")
                        .setRanges([range])
                        .build();
                    var rules = sheet.getConditionalFormatRules();
                    rules.push(rule);
                    sheet.setConditionalFormatRules(rules);
                }  
            }
            const lastRow = ssStudio.getLastRow();
            const othersTopic = ssStudio.getRange(`A1:A${lastRow}`).getValues();
            othersTopic.forEach((cell, index) => {
                if(cell.toString() == 'Other Skills'){
                    ssStudio.getRange(`B${index + 1}:D${index + 1}`).activate().mergeAcross();
                    ssStudio.getCurrentCell().setValue('Comments');
                    ssStudio.getRange(`B${index + 2}:B${lastRow}`).clearDataValidations();
                    for (let cell = index+2; cell <= lastRow; cell++){
                        ssStudio.getRange(`B${cell}:D${cell}`).mergeAcross();
                    }
                }
            });
        });
        updateGraph();
    } catch (error) {
        SpreadsheetApp.getUi().alert("😊 Sorry. Studio selected (Cell: B:3) doesn't exist!!! ");
    }
}

function updateGraph(){
    const idStudio = Utils.getStudioFolder(); 
    const foreingSheets = Utils.getSheetsStudio(idStudio); 
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const allTopics = [];
    let totalMainTopics = 0;
    const arraySum = [];
    const arrayCount = [];

    foreingSheets.forEach((sheet) => {
        const hasSheet = ss.getSheetByName(sheet);
        
        if (hasSheet != null) {
            const informationSheet = ss.getSheetByName(sheet);
            const lastRow = informationSheet.getLastRow();
            let numberSkills = 0;
            const arrayTopics = [];
            const rows = [];
            const rangeColumnB = informationSheet.getRange(`B1:B${lastRow}`).getValues();
            const rangeColumnA = informationSheet.getRange(`A1:A${lastRow}`).getValues();

            rangeColumnB.forEach((cell, index) => {
                if (cell.toString() == 'Score' || cell.toString() == 'Comments' ) {
                    numberSkills += 1;
                    totalMainTopics += 1;
                    rows.push(index + 1);
                    arrayTopics.push(rangeColumnA[index].toString());
                    allTopics.push([rangeColumnA[index].toString()]);
                }
            });
            const vsChartData = ss.getSheetByName('VS ChartData');
            vsChartData.getRange(`C2:C${totalMainTopics + 1}`).setValues(allTopics);
            rows.forEach( (elem, index) => {
                let lengthRows = rows.length;
                let nextElement = rows[index + 1];
                let sumRange;
                let countRange;
                let rangeSum;
                let rangeCount;
                
                if (lengthRows == 1) {
                    nextElement = lastRow;
                    rangeSum = `B2:B${lastRow}`;
                    rangeCount = `A2:A${lastRow}`;
                    sumRange = `=SUM(${sheet}!${rangeSum})`;
                    countRange = `=COUNTA(${sheet}!${rangeCount})*5`;
                    arraySum.push([sumRange]);
                    arrayCount.push([countRange]);
                   
                } else if (lengthRows > 1) {  

                    if (nextElement != undefined) {
                        rangeSum = `B${elem + 1}:B${nextElement - 1}`;
                        rangeCount = `A${elem + 1}:A${nextElement - 1}`;
                        sumRange = `=SUM(${sheet}!${rangeSum})`;
                        countRange = `=COUNTA(${sheet}!${rangeCount})*5`;
                        arraySum.push([sumRange]);
                        arrayCount.push([countRange])
                    } else if (elem == rows[rows.length - 1]) {
                        rangeSum = `B${elem + 1}:B${lastRow}`;
                        rangeCount = `A${elem + 1}:A${lastRow}`;
                        sumRange = `=SUM(${sheet}!${rangeSum})`;
                        countRange = `=COUNTA(${sheet}!${rangeCount})*5`;
                        arraySum.push([sumRange]);
                        arrayCount.push([countRange])
                    }
                }
                vsChartData.getRange(`D2:D${arraySum.length + 1}`).setValues(arraySum);
                vsChartData.getRange(`E2:E${arrayCount.length + 1}`).setValues(arrayCount);
            });
        }
    })
}