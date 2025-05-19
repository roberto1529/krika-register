<?php
/**
 * Plugin Name: Krika Registro | Siesa.
 * Description: Plugin con React, Babel, Axios y Bootstrap por CDN.
 * Version: 1.0
 * Author: Ing. Roberto Molina Gonzalez | Líder de Innovación de Desarrollo
 */

add_shortcode('reg_krika_plugin_form', 'reg_krika_form_shortcode');

function reg_krika_form_shortcode() {
    ob_start();
    echo '<div id="reg-krika-root"></div>';
    return ob_get_clean();
}

add_action('wp_enqueue_scripts', 'reg_krika_enqueue_scripts');

function reg_krika_enqueue_scripts() {
    wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css');
    wp_enqueue_style('reg-krika-style', plugin_dir_url(__FILE__) . 'style.css', null,true);
    wp_enqueue_script('react', 'https://unpkg.com/react@17/umd/react.development.js', [], null, true);
    wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@17/umd/react-dom.development.js', [], null, true);
    wp_enqueue_script('babel', 'https://unpkg.com/@babel/standalone/babel.min.js', [], null, true);
    wp_enqueue_script('axios', 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', [], null, true);
    wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js', [], null, true);

    wp_enqueue_script('reg-krika-script', plugin_dir_url(__FILE__) . 'app.js', ['babel'], null, true);
    wp_script_add_data('reg-krika-script', 'type', 'text/babel');
}

// Ruta personalizada: /formulario
add_action('init', function() {
    add_rewrite_rule('^formulario/?$', 'index.php?reg_krika_formulario=1', 'top');
});

add_filter('query_vars', function($vars) {
    $vars[] = 'reg_krika_formulario';
    return $vars;
});

add_action('template_redirect', function() {
    if (get_query_var('reg_krika_formulario')) {
        status_header(200);
        include plugin_dir_path(__FILE__) . 'template-formulario.php';
        exit;
    }
});
