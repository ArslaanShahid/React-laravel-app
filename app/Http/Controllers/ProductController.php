<?php

namespace App\Http\Controllers;

use App\Jobs\ExportProductCSVJob;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::latest()->paginate(10);
        return Inertia::render('App', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|max:50',
            'description' => 'required|min:7|max:500',
            'price' => 'required|integer'
        ]);

        Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        return Redirect::back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $todo
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        return Inertia::render('Edit', [
            'productSingle' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title' => 'required|min:7|max:50',
            'description' => 'required|min:7|max:500',
            'price' => 'required|integer'
        ]);

        $product->update($request->all());

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return Redirect::back();
    }

    public function exportCSV()
    {
        $fileName = 'products.csv';
        $products = Product::all();

        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );

        $columns = array('Title', 'Description', 'Price', 'Created');

        $callback = function () use ($products, $columns) {
            $today = now();
            $file = fopen("products/product-{$today->format('Y-m-d-H-i-s')}.csv", 'w');
            fputcsv($file, $columns);

            foreach ($products as $product) {
                $row['Title'] = $product->title;
                $row['Description'] = $product->description;
                $row['Price'] = $product->price;
                $row['Created'] = $product->created_at;

                fputcsv($file, array($row['Title'], $row['Description'], $row['Price'], $row['Created']));
            }

            fclose($file);
        };

        $response = response()->stream($callback, 200, $headers);
        $response->send();

        return Redirect::back();
    }
}
