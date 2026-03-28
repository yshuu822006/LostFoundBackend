package edu.infosys.lostFoundLocatorApplication1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostFoundLocatorApplication1.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication1.bean.MatchItemDTO;
import edu.infosys.lostFoundLocatorApplication1.dao.MatchItemDao;
import edu.infosys.lostFoundLocatorApplication1.service.MatchItemService;

@RestController
@RequestMapping("/lostfound")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class MatchItemController {

    @Autowired
    private MatchItemService Service;

    @Autowired
    private MatchItemDao matchItemDao;

    @PostMapping("/match")
    public void saveMatchItem(@RequestBody MatchItemDTO matchItemDTO) {
        Service.updateLostFoundItems(matchItemDTO);
        MatchItem matchItem = new MatchItem(matchItemDTO);
        matchItemDao.saveMatchItem(matchItem);
    }

    @GetMapping("/match")
    public List<MatchItem> getAllMatchItems() {
        return matchItemDao.getAllMatchItems();
    }
}
