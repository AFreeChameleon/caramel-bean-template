
        const express = require('express');
        const router = express.Router();
        const userController = require('../controllers/userController');
        const { ensureAuthenticated } = require('../config/auth');
    
        router.get('/login', userController.GetLogin);
        router.get('/register', userController.GetRegister);
    
        // Register Handler
        router.post('/register', userController.PostRegister);
    
        // Login Handler
        router.post('/login', userController.PostLogin);
    
        // Logout Handler
        router.get('/logout', userController.GetLogout);
    
        // Dashboard
        router.get('/dashboard', ensureAuthenticated, userController.GetDashboard);
    
        module.exports = router;