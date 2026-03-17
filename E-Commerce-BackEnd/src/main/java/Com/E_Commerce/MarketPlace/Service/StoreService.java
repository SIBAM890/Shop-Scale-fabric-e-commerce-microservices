package Com.E_Commerce.MarketPlace.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Com.E_Commerce.MarketPlace.Config.StoreConfig;

@Service
public class StoreService {

    @Autowired
    private StoreConfig config;

    public StoreConfig getStoreDetails(){
        return config;
    }
}