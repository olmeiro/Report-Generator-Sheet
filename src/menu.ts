function onOpen() {
  const MAIN_MENU = '🛠️ GK Tools', 
	MENU_GENERATE = '📝 Generate Script',
	NEW_FETCH = "🔎 Studio's Sheets"; 
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu(MAIN_MENU)
        .addItem(MENU_GENERATE, 'createFetchScript')
        .addSeparator()
        .addSubMenu(SpreadsheetApp.getUi().createMenu('📥 Create Pdf')
        .addItem('☁️ Save PDF', 'savePdf')
        .addItem('💻 Save and Download PDF', 'savePdfLocal'))
        .addSeparator()
        .addItem(NEW_FETCH, 'createFetchSheet')
        .addToUi();
}
/**
 * Load the html file content from a file
 * @param filename
 * @returns string html file content
 */
 function include(filename): string {
	return HtmlService.createHtmlOutputFromFile(filename)
		.getContent();
}