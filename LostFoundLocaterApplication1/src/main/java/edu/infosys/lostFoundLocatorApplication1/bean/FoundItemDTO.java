package edu.infosys.lostFoundLocatorApplication1.bean;


public class FoundItemDTO implements Comparable<FoundItemDTO>{

    private String foundItemId;
    private String foundItemName;
    private String color;
    private String brand;
    private String category;
    private String location;
    private String username;
    private String lostDate;
    private Boolean status;

    public FoundItemDTO(FoundItem f) {
        this.foundItemId = f.getFoundItemId();
        this.foundItemName = f.getFoundItemName();
        this.color = f.getColor();
        this.brand = f.getBrand();
        this.category = f.getCategory();
        this.location = f.getLocation();
        this.username = f.getUsername();
        this.lostDate = f.getLostDate();
        this.status = f.getStatus();
    }

    public FoundItemDTO(String foundItemId, String foundItemName, String color, String brand, String category,
                        String location, String username, String lostDate, Boolean status) {
        this.foundItemId = foundItemId;
        this.foundItemName = foundItemName;
        this.color = color;
        this.brand = brand;
        this.category = category;
        this.location = location;
        this.username = username;
        this.lostDate = lostDate;
        this.status = status;
    }

    public String getFoundItemId() {
        return foundItemId;
    }

    public void setFoundItemId(String foundItemId) {
        this.foundItemId = foundItemId;
    }

    public String getFoundItemName() {
        return foundItemName;
    }

    public void setFoundItemName(String foundItemName) {
        this.foundItemName = foundItemName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLostDate() {
        return lostDate;
    }

    public void setLostDate(String lostDate) {
        this.lostDate = lostDate;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public int compareTo(FoundItemDTO second) {
        return this.foundItemId.compareTo(second.foundItemId);
    }
}
