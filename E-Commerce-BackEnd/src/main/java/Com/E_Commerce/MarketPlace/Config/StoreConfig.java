package Com.E_Commerce.MarketPlace.Config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "store")
@Data
public class StoreConfig {

    private String adminName;
    private String adminPassword;

    private String storeName;
    private String categories;
    private String currency;
    private String description;
}