package com.example.api.bookmanage.controller;

import com.example.api.bookmanage.domain.User;
import com.example.api.bookmanage.dto.UserRequest;
import com.example.api.bookmanage.dto.UserResponse;
import com.example.api.bookmanage.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/users")
    public ResponseEntity<UserResponse> registerUser(@RequestBody UserRequest request) {
        User createdUser = userService.registerUser(request.getLoginId(), request.getPassword());
        return ResponseEntity.ok(new UserResponse(createdUser.getId(), createdUser.getLoginId()));
    }

    // 로그인
    @PostMapping("/auth/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserRequest request) {
        User loggedInUser = userService.login(request.getLoginId(), request.getPassword());
        return ResponseEntity.ok(new UserResponse(loggedInUser.getId(), loggedInUser.getLoginId()));
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long userId,
                                              @RequestBody UserRequest dto) {
        User updatedUser = userService.updateUser(userId, dto.getLoginId(), dto.getPassword());
        return ResponseEntity.ok(new UserResponse(updatedUser.getId(), updatedUser.getLoginId()));
    }

}