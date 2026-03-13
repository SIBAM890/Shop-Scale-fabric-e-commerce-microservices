package Com.E_Commerce.MarketPlace.Controller;

import java.util.HashMap;
import java.util.Map;

import Com.E_Commerce.MarketPlace.Model.User;
import Com.E_Commerce.MarketPlace.Service.AuthService;
import Com.E_Commerce.MarketPlace.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    AuthService service;

    @Autowired
    JwtUtil jwt;

    @PostMapping("/signin")
    public User signin(@RequestBody User user){

        return service.signin(user);
    }

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody User user){

        User valid = service.login(user.getEmail(),user.getPassword());

        Map<String,String> response = new HashMap<>();

        if(valid!=null){

            String token = jwt.generateToken(valid.getEmail());

            response.put("token",token);

        }else{
            response.put("error","Invalid Credentials");
        }

        return response;
    }
}