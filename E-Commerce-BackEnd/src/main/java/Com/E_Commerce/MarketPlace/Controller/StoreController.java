package Com.E_Commerce.MarketPlace.Controller;

import Com.E_Commerce.MarketPlace.Config.StoreConfig;
import Com.E_Commerce.MarketPlace.Service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/store")
@CrossOrigin
public class StoreController {

    @Autowired
    private StoreService service;

    @GetMapping
    public StoreConfig getStore(){
        return service.getStoreDetails();
    }
}