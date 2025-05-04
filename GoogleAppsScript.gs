function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Log the incoming data for debugging
    Logger.log("Received data: " + JSON.stringify(e.postData.contents));
    
    // Parse the data
    const data = JSON.parse(e.postData.contents);
    const phoneNumber = data.phoneNumber;
    const timestamp = new Date();
    
    // Add to sheet
    sheet.appendRow([phoneNumber, timestamp]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Log any errors
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Add a test function to verify sheet access
function testSheetAccess() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["Test phone", new Date()]);
  Logger.log("Test row added successfully");
}
