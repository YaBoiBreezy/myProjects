package PackageThingy;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import javafx.scene.control.Label;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.layout.StackPane;   //not all these imports are necessary, could remove the grey ones.


public class ElectronicStoreView extends Pane {
    protected Button AddToCart;
    protected Button RemoveFromCart;
    protected Button CompleteSale;
    protected Button ResetStore;
    protected TextField Sales;
    protected TextField Revenue;
    protected TextField Sale;
    protected ListView<String> MostPopList;//since electronicstoreApp needs to use these things, i made them protected, the alternative was
    // like 20 get/set/setDisable/etc. functions.
    protected ListView<String> StoreStock;
    protected ListView<String> CurrentCart;
    protected Label MostPopLabel;
    protected Label SalesLabel;
    protected Label RevenueLabel;
    protected Label SaleLabel;
    protected Label StoreSummaryLabel;
    protected Label StoreStockLabel;
    protected Label CurrentCartLabel;
    Pane pane;


    public ElectronicStoreView() {
        AddToCart = new Button("Add To Cart");  //setting all bits to proper locations/sizes/texts
        AddToCart.setDisable(true);
        AddToCart.relocate(260,330);
        AddToCart.setPrefSize(125,50);
        RemoveFromCart = new Button("Remove from Cart");
        RemoveFromCart.setDisable(true);
        RemoveFromCart.relocate(470,330);
        RemoveFromCart.setPrefSize(125,50);
        CompleteSale = new Button("Complete Sale");
        CompleteSale.setDisable(true);
        CompleteSale.relocate(595,330);
        CompleteSale.setPrefSize(125,50);
        ResetStore = new Button ("Reset Store");
        ResetStore.relocate(42,330);
        ResetStore.setPrefSize(125,50);
        Sales = new TextField("0");
        Sales.setDisable(true);             //disabled the textViews, not required but a good idea.
        Sales.relocate(80,50);
        Sales.setPrefSize(100,20);
        Revenue = new TextField("0.00");
        Revenue.setDisable(true);
        Revenue.relocate(80,80);
        Revenue.setPrefSize(100,20);
        Sale = new TextField("N/A");
        Sale.setDisable(true);
        Sale.relocate(80,110);
        Sale.setPrefSize(100,20);

        MostPopList = new ListView<String> ();
        MostPopList.relocate(25, 160);
        MostPopList.setPrefSize(160, 160);
        StoreStock = new ListView<String> ();
        StoreStock.relocate(200, 50);
        StoreStock.setPrefSize(250, 270);
        CurrentCart = new ListView<String> ();
        CurrentCart.relocate(470, 50);
        CurrentCart.setPrefSize(250, 270);

        MostPopLabel = new Label ("Most Popular Items:");
        MostPopLabel.relocate(50,140);
        SalesLabel = new Label ("# Sales:");
        SalesLabel.relocate(30,50);
        RevenueLabel = new Label ("Revenue:");
        RevenueLabel.relocate(30,80);
        SaleLabel = new Label ("$/Sale:");
        SaleLabel.relocate(30,110);
        StoreSummaryLabel = new Label ("Store Summary:");
        StoreSummaryLabel.relocate(40,20);
        StoreStockLabel = new Label ("Current Stock:");
        StoreStockLabel.relocate(300,20);
        CurrentCartLabel = new Label ("Current Cart ($0.00):");
        CurrentCartLabel.relocate(550,20);
        getChildren().addAll(AddToCart,RemoveFromCart,ResetStore,CompleteSale,Sales,Revenue,Sale,MostPopList,StoreStock,
                CurrentCart,MostPopLabel,SalesLabel,RevenueLabel,SaleLabel,StoreSummaryLabel,StoreStockLabel,CurrentCartLabel);
    }/*
    public void start(Stage stage){

    }
    public static void main(String[] args){
        launch(args);
    }*/
}
