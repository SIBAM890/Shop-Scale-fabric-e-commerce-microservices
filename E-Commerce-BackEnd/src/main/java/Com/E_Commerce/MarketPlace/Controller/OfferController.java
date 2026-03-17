package Com.E_Commerce.MarketPlace.Controller;

import Com.E_Commerce.MarketPlace.Model.Offer;
import Com.E_Commerce.MarketPlace.Service.AdminService;
import Com.E_Commerce.MarketPlace.Service.OfferService;
import Com.E_Commerce.MarketPlace.dto.OfferRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin
public class OfferController {

    @Autowired
    private OfferService offerService;

    @Autowired
    private AdminService adminService;

    @PostMapping
    public Object createOffer(@RequestBody OfferRequest request,
                              @RequestParam String adminName,
                              @RequestParam String password){

        if (!adminService.isAdminValid(adminName, password)) {
            return "❌ Unauthorized";
        }

        Offer offer = new Offer();
        offer.setTitle(request.getTitle());
        offer.setDescription(request.getDescription());

        offer.setStartDate(request.getStartDate().atStartOfDay());
        offer.setEndDate(request.getEndDate().atTime(23,59,59));

        return offerService.createOffer(offer);
    }

    @PutMapping("/{id}")
    public Object updateOffer(@PathVariable Long id,
                              @RequestBody OfferRequest request,
                              @RequestParam String adminName,
                              @RequestParam String password){

        if (!adminService.isAdminValid(adminName, password)) {
            return "❌ Unauthorized";
        }

        Offer offer = offerService.getById(id);

        offer.setTitle(request.getTitle());
        offer.setDescription(request.getDescription());
        offer.setStartDate(request.getStartDate().atStartOfDay());
        offer.setEndDate(request.getEndDate().atTime(23,59,59));

        return offerService.createOffer(offer);
    }

    @GetMapping
    public List<Offer> getOffers(){
        return offerService.getAllOffers();
    }
}