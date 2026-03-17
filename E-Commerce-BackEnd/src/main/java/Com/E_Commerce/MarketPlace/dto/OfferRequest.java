package Com.E_Commerce.MarketPlace.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class OfferRequest {
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
}