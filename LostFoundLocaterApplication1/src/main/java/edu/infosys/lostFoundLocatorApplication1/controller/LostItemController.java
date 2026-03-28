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
import edu.infosys.lostFoundLocatorApplication1.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication1.dao.LostItemDao;
import edu.infosys.lostFoundLocatorApplication1.service.LostItemService;
import edu.infosys.lostFoundLocatorApplication1.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class LostItemController {
	@Autowired
	private LostItemDao lostItemDao;
	
	@Autowired
	private LostfoundUserService service;
	
	@Autowired
	private LostItemService lostService;
	
	 @PostMapping("/lost")
	    public void saveLostItem(@RequestBody LostItem lostItem) {
		    lostItemDao.saveLostItem(lostItem);
	    }

	    @GetMapping("/lost")
	    public List<LostItem> getAllLostItems() {
	        return lostItemDao.getAllLostItems();
	    }

	    @GetMapping("/lost/{lostItemId}")
	    public LostItem getLostItemById(@PathVariable String lostItemId) {
	        return lostItemDao.getLostItemById(lostItemId);
	    }

	    @DeleteMapping("/lost/{lostItemId}")
	    public void deleteLostItemById(@PathVariable String lostItemId) {
	    	lostItemDao.deleteLostItemById(lostItemId);
	    }
	    
	    @PutMapping("/lost")
	    public void updateLostItem(@RequestBody LostItem lostItem) {
	    	lostItemDao.saveLostItem(lostItem);
	    }
	    
	    @GetMapping("/lost-id")
	    public String generateLostItemId() {
	        return lostService.generateLostItemId();
	    }

	    @GetMapping("/lost-user")
	    public List<LostItem> getLostItemsByUsername() {
	       String userId=service.getUserId();
	       return lostItemDao.getLostItemsByUsername(userId);
	    }
}


