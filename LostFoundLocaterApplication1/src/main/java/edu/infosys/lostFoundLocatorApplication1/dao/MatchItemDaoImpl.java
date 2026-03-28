package edu.infosys.lostFoundLocatorApplication1.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.lostFoundLocatorApplication1.bean.MatchItem;

@Repository
public class MatchItemDaoImpl implements MatchItemDao {

    @Autowired
    private MatchItemRepository matchItemRepository;

    @Override
    public MatchItem saveMatchItem(MatchItem matchItem) {
        return matchItemRepository.save(matchItem);
    }

    @Override
    public List<MatchItem> getAllMatchItems() {
        return matchItemRepository.findAll();
    }
}
