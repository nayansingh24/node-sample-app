const patientController                             = require('./patientController/patientController');
const patientValidator                              = require('./patientValidator/patientValidator');

app.post('/create', patientValidator.patientCreate, patientController.patientCreate);
app.post('/update', patientValidator.patientEdit, patientController.patientEdit);
app.get('/read', patientValidator.patientDetails, patientController.patientDetails);
app.get('/delete',patientValidator.patientRemove, patientController.patientRemove)
