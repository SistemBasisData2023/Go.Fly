const bcrypt = require('bcrypt');
const { pool } = require('../config/config');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const accountController = {
  registerUser: async (req, res) => {
    console.log('registerUser');
    try {
      const { name, surname, gender, birthdate, email, phone_number, country, province, password } = req.body;
  
      // Check if the email already exists
      const existingEmailQuery = 'SELECT * FROM Users WHERE email = $1';
      const existingEmailValues = [email];
      const existingEmailResult = await pool.query(existingEmailQuery, existingEmailValues);
  
      if (existingEmailResult.rowCount > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Check if the phone_number already exists
      const existingPhoneNumberQuery = 'SELECT * FROM Users WHERE phone_number = $1';
      const existingPhoneNumberValues = [phone_number];
      const existingPhoneNumberResult = await pool.query(existingPhoneNumberQuery, existingPhoneNumberValues);
  
      if (existingPhoneNumberResult.rowCount > 0) {
        return res.status(400).json({ message: 'Phone number already exists' });
      }
  
      // Check if the country exists
      const countryQuery = 'SELECT * FROM country WHERE two_letter = $1';
      const countryValues = [country];
      const countryResult = await pool.query(countryQuery, countryValues);
  
      if (countryResult.rowCount === 0) {
        return res.status(400).json({ message: 'Invalid country' });
      }
  
      // Check if the subcountry exists and belongs to the specified country
      const subcountryQuery = 'SELECT * FROM subcountry WHERE country = $1 AND subcountry_name = $2';
      const subcountryValues = [country, province];
      const subcountryResult = await pool.query(subcountryQuery, subcountryValues);
  
      if (subcountryResult.rowCount === 0) {
        return res.status(400).json({ message: 'Invalid subcountry' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the Users table with isadmin set to false
      const registerUserQuery = `
        INSERT INTO Users (name, surname, gender, birthdate, email, phone_number, country, province, password, isadmin)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, false)
      `;
      const registerUserValues = [
        name,
        surname,
        gender,
        birthdate,
        email,
        phone_number,
        country,
        province,
        hashedPassword
      ];
      const userResult = await pool.query(
        registerUserQuery,
        registerUserValues
      );
      const user = userResult.rows[0];

      const response = {
      user,
      message: 'User registered successfully',
      };
      res.status(200).json(response);
      console.log('registerUser success');
      console.log(user);
    } catch (error) {
      console.error('Error registering user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  
  
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const userQuery = 'SELECT * FROM users WHERE email = $1';
      const userValues = [email];
      const userResult = await pool.query(userQuery, userValues);

      if (userResult.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the password is correct
      const user = userResult.rows[0];
      //const isPasswordCorrect = (password == user.password);//harus diganti
      const isHashedPasswordCorrect = await bcrypt.compare(password, user.password);
      const passwordCorrect = (!isHashedPasswordCorrect);

      if (passwordCorrect) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // Generate JWT token with 1 week expiration
      const token = jwt.sign({ user_id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: '7d',
      });

      // Include the token in the response
      user.token = token;

      res.status(200).json(user);
      console.log('loginUser success');
      console.log(user);
    } catch (error) {
      console.error('Error logging in user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Check if the user exists
      const userQuery = 'SELECT * FROM Users WHERE user_id = $1';
      const userValues = [user_id];
      const userResult = await pool.query(userQuery, userValues);
  
      if (userResult.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = userResult.rows[0];
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error getting user by ID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  

  updateUserById: async (req, res) => {
    try {
      const { user_id } = req.params;
      const { name, surname, gender, birthdate, email, phone_number, country, province, password } = req.body;
  
      // Check if the email or phone number already exists
      const existingUserQuery =
        'SELECT * FROM Users WHERE (email = $1 OR phone_number = $2) AND user_id != $3';
      const existingUserValues = [email, phone_number, user_id];
      const existingUserResult = await pool.query(
        existingUserQuery,
        existingUserValues
      );
  
      if (existingUserResult.rowCount > 0) {
        return res
          .status(400)
          .json({ message: 'Email or phone number already exists' });
      }
  
      // Check if the user exists
      const userQuery = 'SELECT * FROM Users WHERE user_id = $1';
      const userValues = [user_id];
      const userResult = await pool.query(userQuery, userValues);
  
      if (userResult.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user
      const updateUserQuery = `UPDATE Users
          SET name = $1, surname = $2, gender = $3, birthdate = $4, email = $5, phone_number = $6, country = $7, province = $8, password = $9
          WHERE user_id = $10
        `;
      const updateUserValues = [
        name,
        surname,
        gender,
        birthdate,
        email,
        phone_number,
        country,
        province,
        hashedPassword,
        user_id,
      ];
      await pool.query(updateUserQuery, updateUserValues);
  
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user by ID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  deleteUserById: async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Check if the user exists
      const userQuery = 'SELECT * FROM Users WHERE user_id = $1';
      const userValues = [user_id];
      const userResult = await pool.query(userQuery, userValues);
  
      if (userResult.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete the user
      const deleteUserQuery = 'DELETE FROM Users WHERE user_id = $1';
      await pool.query(deleteUserQuery, userValues);
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user by ID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};

module.exports = accountController;
