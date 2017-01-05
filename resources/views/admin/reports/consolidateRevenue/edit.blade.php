@extends('admin.master')

@section('title')
Consolidate Revenue Account
@endsection

@section('specificheader')
{!! HTML::style('vendors/chosen/chosen.css') !!}
@endsection

@section('content')

<div class="box box-info">
    {!! Form::open(['route'=>['admin.financialReport.consolidateRevenue.update','fid'=>$financialReport->id],'class'=>'form-horizontal', 'method'=>'put']) !!}
	    <div class="box-header with-border">
	    	<table class="table-condensed borderless">
	            <thead>
	                <th style="font-size: 25px; font-weight: 400">
	                    <i class="fa fa-file"></i> Consolidate Revenue Account :Edit:
	                </th>
	            </thead>
	            <tbody>
	                <tr>
	                    <th>Company</th>
	                    <td>: {{ucwords($financialReport->company->name)}}</td>
	                </tr>
	                <tr>
	                    <th>Fiscal Year</th>
	                    <td>: {{($financialReport->fiscalYear->label)}}</td>
	                </tr>
	                <tr>
	                    <th>Quarter</th>
	                    <td>: {{($financialReport->quarter->label)}}</td>
	                </tr>
	                <tr>
	                    <th>Sector</th>
	                    <td>: {{ucwords($financialReport->company->sector->label)}}</td>
	                </tr>
	            </tbody>
	        </table>
	    </div><!-- /.box-header -->
        <div class="box-body">
	        <div class="box-tools" style="margin-bottom: 35px">
	            {!! Form::submit('Update',['class'=>'btn btn-primary pull-right']) !!}
	            {!! Form::reset('Reset',['class'=>'btn btn-primary pull-left']) !!}
	        </div>

            <div class="labels">
				<?php $counter = 0 ?>
				@foreach ($financialReport->consolidateRevenue as $cri)
				<div class="form-group">
					<div class="col-md-4 col-md-offset-2 col-xs-10">
						{!! Form::select('reportLabel['.$counter.']',$reportLabel,$cri->reportLabel->id,['class'=>'form-control reportLabel','required'=>''])!!}
					</div>
					<div class="col-md-3 col-xs-10">
						{!! Form::input('number','value['.$counter.']',$cri->value,['step'=>'any','class'=>'form-control', 'id'=>'reportLabel','required'=>''])!!}
					</div>
					<div class="col-xs-1">
						<i class="fa fa-times fa-2x removeLabel"></i>
					</div>
				</div>
				<?php
					$counter++; 
					if ($counter==count($financialReport->consolidateRevenue)):
						break;
					endif;
				?>
				@endforeach
			</div>
			<div class="form-group" style="margin-top: 30px;">
				<div class="col-md-2 col-md-offset-5">
					<a class="btn btn-default form-control addReportLabel">
						<i class="fa fa-plus-square"></i> Add Label
					</a>
				</div>
			</div>
        </div>
        <div class="box-footer">
            {!! Form::submit('Update',['class'=>'btn btn-primary pull-right']) !!}
            {!! Form::reset('Reset',['class'=>'btn btn-primary pull-left']) !!}
        </div>
    {!! Form::close() !!}
</div>    

@endsection
@section('endscript')
{!! HTML::script('vendors/chosen/chosen.jquery.min.js') !!}
<script type="text/javascript">
	var i = {{$counter}};
	var options = {!! json_encode($reportLabel) !!};
</script>
{!! HTML::script('/assets/nsm/admin/js/report.label.js') !!}
@endsection