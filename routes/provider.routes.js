module.exports = (app) => {
    const providers = require('../controllers/provider.controller');

    // Create a new Provider
    app.post('/providers', providers.create);

    // Retrieve all Providers
    app.get('/providers', providers.findAll);

    // Retrieve a single Provider with providerId
    app.get('/providers/:providerId', providers.findOne);

    //Provider login
    app.get('/providers/auth', providers.auth);

    // Update a Provider with providerId
    app.put('/providers/:providerId', providers.update);

    // Delete a Provider with providerId
    app.delete('/providers/:providerId', providers.delete);
}
