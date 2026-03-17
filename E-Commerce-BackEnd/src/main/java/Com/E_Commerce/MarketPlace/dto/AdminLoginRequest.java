package Com.E_Commerce.MarketPlace.dto;

import lombok.Data;

@Data
public class AdminLoginRequest {
    private String adminName;
    private String password;
}