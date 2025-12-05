package com.example.api.bookmanage.service;

import com.example.api.bookmanage.domain.User;
import com.example.api.bookmanage.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
//    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
//        this.passwordEncoder = new BCryptPasswordEncoder();
    }

//    public User getUser(Long loginId){
//        return userRepository.findById(loginId)
//                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
//    }

    // 회원가입
    @Transactional
    public User registerUser(String loginId, String password) {
        if (password.length() < 8) throw new IllegalArgumentException("비밀번호는 최소 8글자 이상이어야 합니다.");
        if (userRepository.existsByLoginId(loginId)) throw new IllegalArgumentException("이미 존재하는 아이디입니다.");

        User user = new User();
        user.setLoginId(loginId);
        user.setPassword(password);
//        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    // 로그인
    public User login(String loginId, String password) {
        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!user.getPassword().equals(password)) throw new IllegalArgumentException("비밀번호 틀림");
        return user;
    }

//    // 사용자 수정
//    @Transactional
//    public User updateUser(Long userId, String newLoginId, String newPassword) {
//        if (newPassword.length() < 8) throw new IllegalArgumentException("비밀번호는 최소 8글자 이상");
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
//        if (!user.getLoginId().equals(newLoginId) && userRepository.existId(newLoginId))
//            throw new IllegalArgumentException("이미 존재하는 아이디");
//
//        user.setLoginId(newLoginId);
//        user.setPassword(newPassword);
//        // user.setPassword(passwordEncoder.encode(password));
//        return user;
//    }
}