class String
  def url_safe
    self.gsub(/\s+/, '-').downcase
  end
end

namespace :categories do

  require 'rubygems'
  require 'jekyll'
  include Jekyll::Filters

  options = Jekyll.configuration({})
  site = Jekyll::Site.new(options)
  site.read_posts('')

  desc 'create individual category pages'
  task :create_pages do
    puts "Generating category pages..."

    site.categories.sort.each do |category, posts|
      html = ''
      html << <<-HTML
---
layout: default
title: "postings categorized under #{category}"
section: blog
current_category: #{category}
---
      HTML
      html << '<div id="posts">'
        html << "{% for post in site.posts %}"
        html << "{% assign content = post.content %}"
        html << "{% include post.html %}"
        html << "{% endfor %}"
      html << '</div>'

      File.open("categories/#{category.url_safe}.html", 'w+') do |file|
        file.puts html
      end
    end
    puts 'Done.'
  end

  desc 'create individual category feeds'
  task :create_feeds do
    puts "Generating category feeds..."

    site.categories.sort.each do |category, posts|
      xml = ''
      xml << <<-XML
---
layout: nil
---
<?xml version="1.0"?> 
<rss version="2.0"> 
   <channel> 
      <title>#{category} | {{ site.title }}</title> 
      <link>{{ site.url }}</link> 
      <description>posts in the #{category} category</description> 
      <language>en-us</language> 
      <pubDate>#{Time.now.strftime "%a, %d %b %Y %H:%M:%S %z"}</pubDate> 
      <lastBuildDate>#{Time.now.strftime "%a, %d %b %Y %H:%M:%S %z"}</lastBuildDate> 
      {% for post in site.posts %}
        {% include post.xml %}
      {% endfor %}
   </channel> 
</rss>
      XML

      File.open("categories/#{category.url_safe}.xml", 'w+') do |file|
        file.puts xml
      end
    end
    puts 'Done.'
  end
end
