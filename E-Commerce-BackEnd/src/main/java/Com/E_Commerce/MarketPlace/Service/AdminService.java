package Com.E_Commerce.MarketPlace.Service;

import Com.E_Commerce.MarketPlace.Config.StoreConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private StoreConfig config;

    // ✅ Main method (keep this as core logic)
    public boolean isAdminValid(String name, String password) {
        return config.getAdminName().equals(name)
                && config.getAdminPassword().equals(password);
    }

    // ✅ Wrapper method (to fix your controller error)
    public boolean verify(String name, String password) {
        return isAdminValid(name, password);
    }
}