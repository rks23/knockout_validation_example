function EmployeeModel(item = {}) {
    var self = this;
    self.EmployeeID = ko.observable(item.EmployeeID || '');
    self.FirstName = ko.observable(item.FirstName || '').extend({ minLength: 2, maxLength: 10 });
    self.LastName = ko.observable(item.LastName || '').extend({ required: true });
    self.MiddleName = ko.observable(item.MiddleName || '').extend({  // custom message
        required: { message: 'Please supply middle name.' }
    });
    self.FullName = ko.computed(function () {
        return (self.FirstName() || ' ') + (self.MiddleName() || ' ') + (self.LastName() || ' ')
    });
};

function EmployeeAdvanceViewModel() {
    var self = this;
    self.Employee = ko.observable(new EmployeeModel());
    // self.Employee2 = ko.observableArray([new EmployeeModel()]);
    self.Employee2 = ko.observableArray([]);

    const arr = [];
    for (let index = 0; index < 10; index++) {
        let el = new EmployeeModel({EmployeeID: index, FirstName: 'Adam'+index, MiddleName: '', LastName: 'Smith'+index});
        arr.push(el);
    }
    self.Employee2(arr);
}

$(document).ready(function () {
    ko.validation.init({  
        registerExtenders: true,  
        messagesOnModified: true,  
        insertMessages: true,  
        parseInputAttributes: true,  
        errorClass: 'error',  
        messageTemplate: null  
    }, true);  
    var viewModel = new EmployeeAdvanceViewModel();
    viewModel.Employee.errors = ko.validation.group(viewModel.Employee);
    viewModel.Employee2.errors = ko.validation.group(viewModel.Employee2); 
    viewModel.submitDetails = function () {
        if (viewModel.Employee.errors().length == 0 && viewModel.Employee2.errors().length == 0) {
            alert('Thank you.');
        } else {
            alert('Please check your submission.');
            viewModel.Employee.errors.showAllMessages();
            viewModel.Employee2.errors.showAllMessages();
        }
    }
    ko.applyBindings(viewModel);
});