package com.example.api.bookmanage.service;

import com.example.api.bookmanage.domain.User;
import com.example.api.bookmanage.dto.UserDTO;
import com.example.api.bookmanage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    // 회원가입
    public UserDTO.Response registerUser(UserDTO.Request request) {

        String loginId = request.getLoginId();
        String password = request.getPassword();

        if (password.length() < 8) {
            throw new IllegalArgumentException("비밀번호는 최소 8글자 이상이어야 합니다.");
        }

        User user = new User();
        user.setLoginId(loginId);
        user.setPassword(password); // encode 없이 저장

        userRepository.save(user);

        return new UserDTO.Response(user.getLoginId(), "Created Successfully");
    }

    // 로그인
    public UserDTO.Response login(UserDTO.Request request) {

        String loginId = request.getLoginId();
        String password = request.getPassword();

        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!password.equals(user.getPassword())) { // 단순 문자열 비교
            throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
        }

        return new UserDTO.Response(user.getLoginId(), "Login Successful");
    }

    // 비밀번호 수정
    public UserDTO.Response updatePassword(String loginId, UserDTO.PasswordUpdateRequest request) {

        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 기존 비밀번호 확인
        if (!request.getOldPassword().equals(user.getPassword())) {
            throw new IllegalArgumentException("기존 비밀번호가 맞지 않습니다.");
        }

        // 새 비밀번호 유효성 검사
        if (request.getNewPassword().length() < 8) {
            throw new IllegalArgumentException("비밀번호는 최소 8글자 이상이어야 합니다.");
        }

        // 새 비밀번호 저장
        user.setPassword(request.getNewPassword());

        return new UserDTO.Response(user.getLoginId(), "Updated Successfully");
    }
}