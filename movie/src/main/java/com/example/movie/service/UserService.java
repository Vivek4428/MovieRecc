package com.example.movie.service;

import com.example.movie.model.User;
import com.example.movie.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;  // Inject PasswordEncoder instead of BCryptPasswordEncoder

    public User signup(User user) {
        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Use passwordEncoder
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) { // Use passwordEncoder
            return user; // Return user if email and password match
        }
        return null; // Return null if authentication fails
    }
}
