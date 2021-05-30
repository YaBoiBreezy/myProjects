package PackageThingy;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.scene.input.MouseEvent;
import javafx.event.*;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import javafx.scene.control.Label;
import java.util.ArrayList;

public class ElectronicStoreApp extends Application {
    private ElectronicStore model;
    private ElectronicStoreView view;
    private ArrayList<Product> BeingBought; //One of the TA's suggested using 2 arrayLists to contain the products displayed in stock and cart, it worked great.
    private ArrayList<Product> storeStockProducts;


    public void start(Stage stage){
        model = ElectronicStore.createStore();
        view = new ElectronicStoreView();
        BeingBought = new ArrayList<Product>();      //store product objects of things in cart
        storeStockProducts = new ArrayList<Product>();       //stores product objects of things that can be bought

        for (int x=0;x<model.getCurProducts();x++){
            storeStockProducts.add(model.stock[x]);
            view.StoreStock.getItems().add(model.stock[x].toString());//copies all the products in the model into the background product arrayList and its corresponding listView
        }
        view.MostPopList.getItems().add(model.stock[0].toString());
        view.MostPopList.getItems().add(model.stock[1].toString());//sets 3 mostPop item
        view.MostPopList.getItems().add(model.stock[2].toString());

        view.AddToCart.setOnAction(new EventHandler<ActionEvent>(){ //6 handle functions for the 4 buttons and 2 listViews
            public void handle(ActionEvent actionEvent){
                int index=view.StoreStock.getSelectionModel().getSelectedIndex();   //gets index of product selected
                BeingBought.add(storeStockProducts.get(index)); //adds 1 of the product to cart
                storeStockProducts.get(index).setStockQuantity(-1);//reduces quantity in stock by 1

                model.setCartValue(model.getCartValue()+storeStockProducts.get(index).getPrice());  //updates cartValue, formats string(.00), displays value
                String a=String.format("%.2f",model.getCartValue());
                view.CurrentCartLabel.setText("Current Cart ($"+a+"):");

                if (storeStockProducts.get(index).getStockQuantity()==0){  //out of that product, remove from stock list
                    storeStockProducts.remove(index);
                }
                updateLists(false); //updates listViews based on background product lists, false means dont update mostPop

                view.CompleteSale.setDisable(false);    //update button access
                view.AddToCart.setDisable(true);
            }
        });
        view.RemoveFromCart.setOnAction(new EventHandler<ActionEvent>() {
            public void handle(ActionEvent actionEvent) {
                int index=view.CurrentCart.getSelectionModel().getSelectedIndex();   //gets index of product selected
                if (storeStockProducts.contains(BeingBought.get(index))){   //if storeStock still has that product (not sold out), increase stock by 1
                    storeStockProducts.get(storeStockProducts.indexOf(BeingBought.get(index))).setStockQuantity(-1);
                }
                else{
                    storeStockProducts.add(BeingBought.get(index)); //if it is sold out, the product type must be readded to the stock list
                }

                model.setCartValue(model.getCartValue()-BeingBought.get(index).getPrice());  //updates cartValue, formats string(.00), displays value
                String a=String.format("%.2f",model.getCartValue());
                view.CurrentCartLabel.setText("Current Cart ($"+a+"):");

                BeingBought.remove(BeingBought.get(index)); //removes product from cart
                updateLists(false); //updates listViews based on background product lists, false means dont update mostPop

                if (BeingBought.size()==0){ //if cart is empty, block completeSale button
                    view.CompleteSale.setDisable(true);
                }
                view.RemoveFromCart.setDisable(true);   //set button access
            }
        });
        view.StoreStock.setOnMouseClicked(new EventHandler<MouseEvent>() {
            public void handle(MouseEvent mouseEvent) {
                if (view.StoreStock.getSelectionModel().getSelectedIndex()!=-1){    //if You select a list, but not a thing in the list (click on the bottom), this prevents the buttons from updating.
                    view.AddToCart.setDisable(false);   //updates buttons
                    view.RemoveFromCart.setDisable(true);
                }
            }
        });
        view.CurrentCart.setOnMouseClicked(new EventHandler<MouseEvent>() {
            public void handle(MouseEvent mouseEvent) {
                if (view.CurrentCart.getSelectionModel().getSelectedIndex()!=-1){    //if You select a list, but not a thing in the list (click on the bottom), this prevents the buttons from updating.
                    view.AddToCart.setDisable(true);   //updates buttons
                    view.RemoveFromCart.setDisable(false);
                }
            }
        });
        view.CompleteSale.setOnAction(new EventHandler<ActionEvent>() {
            public void handle(ActionEvent actionEvent) {
                model.setSales(model.getSales()+1);
                model.setRevenue(model.getRevenue()+model.getCartValue());  //updates the textFields
                view.Sales.setText(Integer.toString(model.getSales()));
                String a=String.format("%.2f",model.getRevenue());  //formats strings (.00), then displays them
                view.Revenue.setText(a);
                a=String.format("%.2f",model.getRevenue()/model.getSales());  //formats strings (.00), then displays them
                view.Sale.setText(a);
                model.setCartValue(0.0);
                view.CurrentCartLabel.setText("Current Cart ($0.00):");
                for (int x=0;x<BeingBought.size();x++){//for every product in cart,
                    for (int y=0;y<model.getCurProducts();y++){ //find it in model, then sell it
                        if (BeingBought.get(x)==model.stock[y]){
                            model.stock[y].setSoldQuantity(1);
                        }
                    }
                }
                BeingBought.clear();    //clear cart
                view.AddToCart.setDisable(true);
                view.RemoveFromCart.setDisable(true);   //update buttons
                view.CompleteSale.setDisable(true);
                updateLists(true);  //update listViews, and redo mostPopular
            }
        });
        view.ResetStore.setOnAction(new EventHandler<ActionEvent>() {
            public void handle(ActionEvent actionEvent) {
                model = ElectronicStore.createStore();  //resets model
                view.AddToCart.setDisable(true);
                view.RemoveFromCart.setDisable(true);   //Basically just sets everything to reset values
                view.CompleteSale.setDisable(true);
                view.MostPopList.getItems().clear();
                view.CurrentCart.getItems().clear();
                view.StoreStock.getItems().clear();

                view.Sales.setText(Integer.toString(model.getSales()));
                view.Revenue.setText(Double.toString(model.getRevenue()));
                view.Sale.setText(Double.toString(model.getRevenue()/model.getSales()));
                view.CurrentCartLabel.setText("Current Cart ($"+model.getCartValue()+"):");

                BeingBought.clear();
                storeStockProducts.clear();

                for (int x=0;x<model.getCurProducts();x++){
                    storeStockProducts.add(model.stock[x]);
                    view.StoreStock.getItems().add(model.stock[x].toString());
                }
                view.MostPopList.getItems().add(model.stock[0].toString());
                view.MostPopList.getItems().add(model.stock[1].toString());
                view.MostPopList.getItems().add(model.stock[2].toString());
            }
        });
        stage.setTitle("Electronic Store View - "+model.getName()); //makes the window
        stage.setScene(new Scene(view,800,400));
        stage.setResizable(false);
        stage.show();
    }
    public void updateLists(Boolean soldStuff){ //copies product arrayLists toStrings into their respective listViews
        view.StoreStock.getItems().clear();
        for (int x=0;x<storeStockProducts.size();x++){
            view.StoreStock.getItems().add(storeStockProducts.get(x).toString());
        }
        view.CurrentCart.getItems().clear();
        for (int x=0;x<BeingBought.size();x++){
            view.CurrentCart.getItems().add(BeingBought.get(x).toString());
        }
        if(soldStuff){//get best sellers
            view.MostPopList.getItems().clear();
            int[] bestSold = {-1,-1,-1};
            int[] bestSoldIndex = {-1,-1,-1};
            for (int y=0;y<3;y++){  //goes through all products 3 times
                for (int x=0;x<model.getCurProducts();x++){
                    if (model.stock[x].getSoldQuantity()>bestSold[y] && bestSoldIndex[0]!=x && bestSoldIndex[1]!=x){//finds best seller that isn't already saved in the array of top 3
                        bestSold[y]=model.stock[x].getSoldQuantity();
                        bestSoldIndex[y]=x;
                    }
                }
            }
            for (int x=0;x<3;x++){  //places best 3 into mostpop listView
                view.MostPopList.getItems().add(model.stock[bestSoldIndex[x]].toString());
            }
        }
    }
}
//stage.setTitle("Electronic Store View - "+model.getName());