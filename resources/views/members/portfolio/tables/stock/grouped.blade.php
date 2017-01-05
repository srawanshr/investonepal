<div class="box">
    <div class="box-header with-border">
        <div class="box-title">
            <form action="#" class="form form-inline">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fa fa-shopping-cart"></i> Stock Basket
                        </div>
                        {!! Form::select(
                            'basketList', $baskets->lists('name','id')->toArray(), 
                            $selected,['class'=>'input-sm chosen-select','data-name'=>'baskets'])
                        !!}
                    </div>
                </div>
            </form>
        </div>
        <div class="box-tools pull-right">
            <div class="btn-group">
                <a class="btn btn-box-tool" href="{{route('member.report.stock')}}"><i class="fa fa-area-chart"></i> Report</a>
                <button class="btn btn-box-tool" data-modal="buy"><i class="fa fa-plus-circle"></i> Add Stock</button>
            </div>
        </div>
    </div>
    <div class="box-body" style='{{$baskets->isEmpty() ? "position:relative;background:#D2D6DE" : ""}}'>
        <h4 style="text-align: center; margin-top: 0">Basket Name: 
            <span data-title style="font-weight: 600"></span>
        </h4>
        <div class="row">
            <div class="col-xs-12">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" id="toggle-sold-stock"> Show/Hide Sold Stock
                    </label>
                </div>
            </div>
            <div class="table-responsive col-xs-12">    
                <table 
                    class="table table-condensed table-striped" 
                    data-table="grouped" 
                    data-url="{{route('members.stock.fetch-grouped')}}" 
                    style="width: 100%"
                >
                    <thead>
                        <tr>
                            <th><span data-toggle="tooltip" data-placement="top" title="Stock Quote">Quote</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Average Buy Rate">Buy Rate</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Quantity">Qty</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Last Close Price">Close Price</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Investment">Investment</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Market Value">Market Value</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Change">Change</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Child Stocks">Stocks</span></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th><span data-toggle="tooltip" data-placement="top" title="Stock Quote">Quote</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Average Buy Rate">Buy Rate</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Quantity">Qty</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Last Close Price">Close Price</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Investment">Investment</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Market Value">Market Value</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Change">Change</span></th>
                            <th><span data-toggle="tooltip" data-placement="top" title="Total Child Stocks">Stocks</span></th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <th colspan="4">Total</th>
                            <th><span data-investment>Total Investment</span></th>
                            <th><span data-market-value>Market Value</span></th>
                            <th><span data-change>Total Change</span></th>
                            <th colspan="2"></th>
                        </tr>
                    </tfoot>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>