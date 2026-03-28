package edu.infosys.lostFoundLocatorApplication1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostFoundLocatorApplication1.bean.FoundItem;
import edu.infosys.lostFoundLocatorApplication1.bean.FoundItemDTO;
import edu.infosys.lostFoundLocatorApplication1.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication1.dao.FoundItemDao;
import edu.infosys.lostFoundLocatorApplication1.dao.FoundItemRepository;
import edu.infosys.lostFoundLocatorApplication1.dao.LostItemDao;
import edu.infosys.lostFoundLocatorApplication1.service.FoundItemService;
import edu.infosys.lostFoundLocatorApplication1.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class FoundItemController {

    private final FoundItemRepository foundItemRepository;
	@Autowired
	private FoundItemDao foundItemDao;
	
	@Autowired
	private LostfoundUserService service;
	
	@Autowired
	private LostItemDao lostItemDao; 
	
	@Autowired
	private FoundItemService foundService;

    FoundItemController(FoundItemRepository foundItemRepository) {
        this.foundItemRepository = foundItemRepository;
    }
	
	 @PostMapping("/found")
	    public void saveLostItem(@RequestBody FoundItem foundItem) {
		    foundItemDao.savefoundItem(foundItem);
	    }

	    @GetMapping("/found")
	    public List<FoundItem> getAllFoundItems() {
	        return foundItemDao.getAllFoundItems();
	    }

	    @GetMapping("/found/{foundItemId}")
	    public FoundItem getFoundItemById(@PathVariable String foundItemId) {
	        return foundItemDao.getFoundItemById(foundItemId);
	    }

	    @DeleteMapping("/found/{foundItemId}")
	    public void deleteFoundItemById(@PathVariable String foundItemId) {
	    	foundItemDao.deleteFoundItemById(foundItemId);
	    }
	    
	    @PutMapping("/found")
	    public void updateFoundItem(@RequestBody FoundItem foundItem) {
	    	foundItemDao.savefoundItem(foundItem);
	    }
	    
	    @GetMapping("/found-id")
	    public String generateFoundItemId() {
	        return foundService.generateFoundItemId();
	    }

	    @GetMapping("/found-user")
	    public List<FoundItem> getFoundItemsByUsername() {
	       String userId=service.getUserId();
	       return foundItemDao.getFoundItemsByUsername(userId);
	    }
	    
	    @GetMapping("/found-id/{id}")
	    public List<FoundItemDTO> getFoundItemsByLostItem(@PathVariable String id) {
	       LostItem lostItem=lostItemDao.getLostItemById(id);
	       return foundService.collectFoundItems(lostItem);
	    }
	    
}
