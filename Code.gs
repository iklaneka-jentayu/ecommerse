// Google Apps Script for GlobalMart E-commerce
// Spreadsheet Name: "GlobalMart_Ecommerce_Data"

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Spreadsheet ID

function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch(action) {
      case 'getData':
        return getDataFromSheet(e);
      case 'getUsers':
        return getUsers();
      case 'getSettings':
        return getSettings(e);
      default:
        return createResponse(400, {error: 'Invalid action'});
    }
  } catch (error) {
    logError('doGet Error', error.toString());
    return createResponse(500, {error: error.toString()});
  }
}

function doPost(e) {
  const action = e.parameter.action;
  
  try {
    const data = JSON.parse(e.postData.contents);
    
    switch(action) {
      case 'register':
        return registerUser(data);
      case 'log':
        return saveLog(data);
      case 'addProduct':
        return addProduct(data);
      case 'updateProduct':
        return updateProduct(data);
      case 'deleteProduct':
        return deleteProduct(data);
      case 'saveOrder':
        return saveOrder(data);
      case 'saveFreightSettings':
        return saveFreightSettings(data);
      default:
        return createResponse(400, {error: 'Invalid action'});
    }
  } catch (error) {
    logError('doPost Error', error.toString());
    return createResponse(500, {error: error.toString()});
  }
}

// Initialize Spreadsheet with headers
function initializeSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  const sheets = [
    {name: 'users', headers: ['id', 'fullName', 'email', 'phone', 'password', 'role', 'status', 'createdAt', 'updatedAt']},
    {name: 'products', headers: ['id', 'name', 'description', 'category', 'price', 'stock', 'image', 'createdAt', 'updatedAt']},
    {name: 'orders', headers: ['id', 'userId', 'customerName', 'customerEmail', 'items', 'amount', 'status', 'paymentMethod', 'shippingAddress', 'createdAt']},
    {name: 'logs', headers: ['timestamp', 'action', 'module', 'message', 'userId', 'userAgent', 'page']},
    {name: 'settings', headers: ['type', 'key', 'value', 'updatedAt']},
    {name: 'freight_rates', headers: ['type', 'baseRate', 'ratePerKg', 'country', 'updatedAt']}
  ];
  
  sheets.forEach(sheetInfo => {
    let sheet = ss.getSheetByName(sheetInfo.name);
    if (!sheet) {
      sheet = ss.insertSheet(sheetInfo.name);
    }
    
    // Clear existing data
    sheet.clear();
    
    // Set headers
    sheet.getRange(1, 1, 1, sheetInfo.headers.length).setValues([sheetInfo.headers]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, sheetInfo.headers.length);
    headerRange.setBackground('#2563eb');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
  });
  
  // Add default freight rates
  const freightSheet = ss.getSheetByName('freight_rates');
  const defaultRates = [
    ['local', 5.00, 2.00, 'MY', new Date().toISOString()],
    ['international', 15.00, 5.00, 'SG', new Date().toISOString()],
    ['international', 25.00, 8.00, 'US', new Date().toISOString()]
  ];
  
  defaultRates.forEach((rate, index) => {
    freightSheet.getRange(index + 2, 1, 1, 5).setValues([rate]);
  });
  
  return createResponse(200, {success: true, message: 'Spreadsheet initialized successfully'});
}

// Helper function to get sheet data
function getSheetData(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error(`Sheet ${sheetName} not found`);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

// Helper function to append data to sheet
function appendToSheet(sheetName, data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error(`Sheet ${sheetName} not found`);
  }
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(header => data[header] || '');
  
  sheet.appendRow(row);
  return sheet.getLastRow();
}

// Helper function to update data in sheet
function updateInSheet(sheetName, id, data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error(`Sheet ${sheetName} not found`);
  }
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];
  
  const idIndex = headers.indexOf('id');
  if (idIndex === -1) {
    throw new Error('ID column not found');
  }
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][idIndex] == id) {
      headers.forEach((header, colIndex) => {
        if (header !== 'id' && data[header] !== undefined) {
          sheet.getRange(i + 1, colIndex + 1).setValue(data[header]);
        }
      });
      return true;
    }
  }
  
  return false;
}

// Helper function to delete data from sheet
function deleteFromSheet(sheetName, id) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error(`Sheet ${sheetName} not found`);
  }
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];
  
  const idIndex = headers.indexOf('id');
  if (idIndex === -1) {
    throw new Error('ID column not found');
  }
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][idIndex] == id) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  
  return false;
}

// API Functions
function getDataFromSheet(e) {
  const sheetName = e.parameter.sheet;
  const data = getSheetData(sheetName);
  return createResponse(200, data);
}

function getUsers() {
  const users = getSheetData('users');
  // Remove password for security
  const safeUsers = users.map(user => {
    const {password, ...safeUser} = user;
    return safeUser;
  });
  return createResponse(200, safeUsers);
}

function registerUser(userData) {
  // Check if user already exists
  const users = getSheetData('users');
  const existingUser = users.find(u => u.email === userData.email);
  
  if (existingUser) {
    return createResponse(400, {success: false, message: 'User already exists'});
  }
  
  // Generate unique ID
  userData.id = Utilities.getUuid();
  userData.createdAt = new Date().toISOString();
  userData.updatedAt = userData.createdAt;
  
  // Save to sheet
  const rowNumber = appendToSheet('users', userData);
  
  // Log the registration
  saveLog({
    action: 'USER_REGISTER',
    message: `New user registered: ${userData.email}`,
    userId: userData.id
  });
  
  return createResponse(200, {
    success: true,
    userId: userData.id,
    message: 'User registered successfully'
  });
}

function saveLog(logData) {
  logData.timestamp = new Date().toISOString();
  appendToSheet('logs', logData);
  return createResponse(200, {success: true});
}

function addProduct(productData) {
  if (!productData.id) {
    productData.id = Utilities.getUuid();
  }
  
  productData.createdAt = new Date().toISOString();
  productData.updatedAt = productData.createdAt;
  
  appendToSheet('products', productData);
  
  saveLog({
    action: 'PRODUCT_ADD',
    message: `Product added: ${productData.name}`,
    module: 'admin'
  });
  
  return createResponse(200, {success: true, productId: productData.id});
}

function updateProduct(productData) {
  const updated = updateInSheet('products', productData.id, productData);
  
  if (updated) {
    saveLog({
      action: 'PRODUCT_UPDATE',
      message: `Product updated: ${productData.name}`,
      module: 'admin'
    });
    
    return createResponse(200, {success: true});
  } else {
    return createResponse(404, {success: false, message: 'Product not found'});
  }
}

function deleteProduct(data) {
  const deleted = deleteFromSheet('products', data.id);
  
  if (deleted) {
    saveLog({
      action: 'PRODUCT_DELETE',
      message: `Product deleted: ${data.id}`,
      module: 'admin'
    });
    
    return createResponse(200, {success: true});
  } else {
    return createResponse(404, {success: false, message: 'Product not found'});
  }
}

function saveOrder(orderData) {
  orderData.id = Utilities.getUuid();
  orderData.createdAt = new Date().toISOString();
  
  appendToSheet('orders', orderData);
  
  saveLog({
    action: 'ORDER_CREATE',
    message: `New order: ${orderData.id}`,
    userId: orderData.userId
  });
  
  return createResponse(200, {success: true, orderId: orderData.id});
}

function getSettings(e) {
  const type = e.parameter.type;
  const settings = getSheetData('settings');
  
  if (type) {
    const filtered = settings.filter(s => s.type === type);
    const result = {};
    filtered.forEach(s => {
      result[s.key] = s.value;
    });
    return createResponse(200, result);
  }
  
  return createResponse(200, settings);
}

function saveFreightSettings(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('freight_rates');
  
  // Update existing or add new
  const rates = getSheetData('freight_rates');
  const existing = rates.find(r => r.type === data.type && r.country === (data.country || 'default'));
  
  if (existing) {
    // Update existing
    const rowIndex = rates.indexOf(existing) + 2; // +2 for header and 0-index
    sheet.getRange(rowIndex, 2).setValue(data.baseRate);
    sheet.getRange(rowIndex, 3).setValue(data.ratePerKg);
    sheet.getRange(rowIndex, 5).setValue(new Date().toISOString());
  } else {
    // Add new
    appendToSheet('freight_rates', {
      type: data.type,
      baseRate: data.baseRate,
      ratePerKg: data.ratePerKg,
      country: data.country || 'default',
      updatedAt: new Date().toISOString()
    });
  }
  
  saveLog({
    action: 'FREIGHT_SETTINGS_UPDATE',
    message: `${data.type} freight rates updated`,
    module: 'admin'
  });
  
  return createResponse(200, {success: true});
}

// Helper function to create JSON response
function createResponse(statusCode, data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Helper function to log errors
function logError(action, message) {
  try {
    appendToSheet('logs', {
      timestamp: new Date().toISOString(),
      action: 'ERROR_' + action,
      message: message,
      userId: 'system',
      userAgent: 'GoogleAppsScript',
      page: 'backend'
    });
  } catch (e) {
    // If logging fails, just print to console
    console.error('Logging error:', e);
  }
}

// Toyib Pay Integration Functions
function processToyibPayPayment(paymentData) {
  // This is a mock function for Toyib Pay integration
  // In production, you would integrate with Toyib Pay API
  
  const mockResponse = {
    success: true,
    transactionId: 'TYP' + Date.now(),
    amount: paymentData.amount,
    status: 'completed',
    timestamp: new Date().toISOString()
  };
  
  saveLog({
    action: 'PAYMENT_PROCESS',
    message: `Toyib Pay payment processed: ${mockResponse.transactionId}`,
    userId: paymentData.userId
  });
  
  return mockResponse;
}