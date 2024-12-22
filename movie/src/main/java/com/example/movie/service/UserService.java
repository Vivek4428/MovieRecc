package com.example.movie.service;

import com.example.movie.model.User;
import com.example.movie.repository.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(@Lazy UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Handles user signup with validation for unique username and email.
     *
     * @param user User object containing signup details
     * @return The saved User object
     */
    public User signup(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new IllegalArgumentException("Username is already taken.");
        }

        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Handles login by validating username and password.
     *
     * @param username Username of the user
     * @param password Plain text password for validation
     * @return User object if authentication is successful
     */
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password.");
        }
        return user;
    }

    /**
     * Fetch user details for authentication by username.
     *
     * @param username The username of the user
     * @return UserDetails object for Spring Security
     * @throws UsernameNotFoundException if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles("USER") // Replace or add roles as necessary
                .build();
    }

    /**
     * Checks if a username is already taken.
     *
     * @param username Username to check
     * @return True if the username exists, false otherwise
     */
    public boolean isUsernameTaken(String username) {
        return userRepository.findByUsername(username) != null;
    }

    /**
     * Checks if an email is already registered.
     *
     * @param email Email to check
     * @return True if the email exists, false otherwise
     */
    public boolean isEmailTaken(String email) {
        return userRepository.findByEmail(email) != null;
    }
}
