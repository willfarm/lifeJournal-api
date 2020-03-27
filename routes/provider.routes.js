module.exports = (app) => {
    const providers = require('../Controllers/provider.controller.js');

    // Create a new Provider
    app.post('/providers', providers.create);

    // Retrieve all Providers
    app.get('/providers', providers.findAll);

    // Retrieve a single Provider with providerId
    app.get('/providers/:providerId', providers.findOne);

    // Update a Provider with providerId
    app.put('/providers/:providerId', providers.update);

    // Delete a Provider with providerId
    app.delete('/providers/:providerId', providers.delete);
}
