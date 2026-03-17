package Com.E_Commerce.MarketPlace.Controller;

import Com.E_Commerce.MarketPlace.Service.AdminService;
import Com.E_Commerce.MarketPlace.dto.AdminLoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public String login(@RequestBody AdminLoginRequest request){

        boolean isValid = adminService.verify(
                request.getAdminName(),
                request.getPassword()
        );

        if(isValid){
            return "Login Successful";
        }else{
            return "Invalid Admin Credentials";
        }
    }
}
